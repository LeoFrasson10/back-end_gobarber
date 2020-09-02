import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddUserIdAppointments1599068676311 implements MigrationInterface {
  
  public async up(queryRunner: QueryRunner): Promise<void> {

    //cria a nova coluna
    await queryRunner.addColumn(
      'appointments', 
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'AppoitmentUser',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      //caso o usuario seja deletado Restrict, set null e Cascade(deleta tudo que esta relacionado)
      onDelete: 'SET NULL',
      //caso seu id tenha sido alterado, mude aqui
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppoitmentProvider');

    await queryRunner.dropColumn('appointmemts', 'user_id');    
  }
}
