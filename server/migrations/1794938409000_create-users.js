exports.shorthands = undefined
exports.up = (pgm) => {
    pgm.createTable('users', {
        user_id: 'id',
       email: {type: 'varchar(255)', notNull:true, unique:true},
       hash_password: {type: 'text', notNull:true}
   

    })

}
exports.down = (pgm) => {
    pgm.dropTable('users');
}