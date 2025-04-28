const database = require('../database')

exports.createTodo = async (req, res) => {

  try {
    const result = await database.pool.query({
      text: `INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *`,
      values: [req.user.id, req.body.title, req.body.description]
    })
    return res.status(201).json(result.rows[0])
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
  }

exports.getAllTodo = async (req, res) => {

  try {
    const result = await database.pool.query({
      text: `SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC`,
      values: [req.user.id]
    })
    return res.status(200).json(result.rows)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
  }

exports.updateTodo = async (req, res) => {

    try {
      const result = await database.pool.query({
        text: `UPDATE todos 
       SET title = $1, description = $2, updated_at = NOW() 
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
        values: [req.body.title, req.body.description, req.params.id, req.user.id]
      })
      return res.status(200).json(result.rows[0])
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }

  exports.deleteTodo = async (req, res) => {

    try {
      const result = await database.pool.query({
        text: `DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *`,
        values: [ req.params.id, req.user.id]
      })
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }