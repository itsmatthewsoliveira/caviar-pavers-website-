export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const {
        contact_name,
        contact_phone,
        contact_email,
        source_url,
        original_message,
        status,
        priority,
        ai_summary,
        // Structured fields from form
        service,
        address,
        message
    } = req.body;

    const NOTION_API_KEY = process.env.NOTION_API_KEY;
    const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

    // Agent Hub fallback config
    const AGENT_HUB_API = 'https://agent-hub-three-mu.vercel.app';
    const CAVIAR_VENTURE_ID = '5378eb2e-89e7-4c5a-84bd-c2304dee406a';

    let notionSuccess = false;

    // Try Notion first
    try {
        const notionRes = await fetch(`https://api.notion.com/v1/pages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parent: { database_id: NOTION_DATABASE_ID },
                properties: {
                    'Name': {
                        title: [{ text: { content: contact_name || 'Unknown' } }]
                    },
                    'Phone': {
                        phone_number: contact_phone || null
                    },
                    'Email': {
                        email: contact_email || null
                    },
                    'Service': service ? {
                        select: { name: service }
                    } : undefined,
                    'Address': {
                        rich_text: [{ text: { content: address || '' } }]
                    },
                    'Message': {
                        rich_text: [{ text: { content: message || original_message || '' } }]
                    },
                    'Source URL': {
                        url: source_url || null
                    },
                    'Status': {
                        select: { name: status || 'New' }
                    },
                    'Priority': {
                        select: { name: priority || 'High' }
                    },
                    'AI Summary': {
                        rich_text: [{ text: { content: ai_summary || '' } }]
                    }
                }
            })
        });

        if (notionRes.ok) {
            notionSuccess = true;
        } else {
            const err = await notionRes.json();
            console.error('Notion API error:', JSON.stringify(err));
        }
    } catch (err) {
        console.error('Notion request failed:', err.message);
    }

    // Fallback to Agent Hub if Notion failed
    if (!notionSuccess) {
        try {
            const hubRes = await fetch(`${AGENT_HUB_API}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    venture_id: CAVIAR_VENTURE_ID,
                    contact_name,
                    contact_phone,
                    contact_email,
                    source: 'website-contact-form',
                    source_url,
                    original_message: [service, address, message].filter(Boolean).join(' | '),
                    status: 'new',
                    priority: 'high',
                    ai_summary,
                    tags: ['website', (service || '').toLowerCase().replace(/\s+/g, '-')].filter(Boolean),
                    language: 'en'
                })
            });

            if (hubRes.ok) {
                return res.status(200).json({ success: true, destination: 'agent-hub-fallback' });
            }
        } catch (hubErr) {
            console.error('Agent Hub fallback failed:', hubErr.message);
        }

        return res.status(500).json({ error: 'Both Notion and Agent Hub failed' });
    }

    return res.status(200).json({ success: true, destination: 'notion' });
}
