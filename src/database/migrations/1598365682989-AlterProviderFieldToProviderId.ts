import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AlterProviderFieldToProviderId1598365682989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      //deleta a coluna que vai alterar
      await queryRunner.dropColumn('appointments', 'provider');
      //cria a nova coluna
      await queryRunner.addColumn(
        'appointments', 
        new TableColumn({
          name: 'provider_id',
          type: 'uuid',
          isNullable: true,
        }),
      );

      await queryRunner.createForeignKey('appointments', new TableForeignKey({
        name: 'AppoitmentProvider',
        columnNames: ['provider_id'],
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

      await queryRunner.dropColumn('appointmemts', 'provider_id');

      await queryRunner.addColumn(
        'appointments', 
        new TableColumn({
          name: 'provider',
          type: 'varchar',
        }),
      );
    }

}
