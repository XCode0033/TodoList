/** @type {import('node-pg-migrate').ColumnDefinitions | undefined} */
exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('todo', {
    todo_id: 'id',
    todo_title: { type: 'varchar(255)', notNull: true },
    todo_category: { type: 'varchar(100)' },
    todo_priority: { type: 'varchar(50)' },
    todo_description: { type: 'text' },
    todo_due_date: { type: 'date' },
    todo_completed: { type: 'boolean', notNull: true, default: false },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  })
}

exports.down = (pgm) => {
  pgm.dropTable('todo')
}
