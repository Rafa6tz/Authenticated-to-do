const database = require('../database')

exports.getAllTodo = async (req, res) => {
    try {
        const result = await database.pool.query('SELECT * FROM todos')

        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

exports.createTodo = async (req, res) => {
    try {
        const result = await database.pool.query({
            text: 'INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
            values: [req.body.user_id, req.body.title, req.body.description]
        })

        return res.status(201).json(result.rows)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const result = await database.pool.query({
            text: `
            UPDATE todos
            SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *
            `,
            values: [req.body.title, req.body.description, req.params.id]
        })
        return res.status(200).json(result.rows[0])
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}