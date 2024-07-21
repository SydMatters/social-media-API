import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721578421430 implements MigrationInterface {
    name = 'Migration1721578421430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_7699af221310daf20de0a5139f2"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_f6577e0f10bd794973cfc02544f"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "userUserId"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "postPostId"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "postId" uuid`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50" FOREIGN KEY ("postId") REFERENCES "posts"("postId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "postId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "postPostId" uuid`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "userUserId" uuid`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_f6577e0f10bd794973cfc02544f" FOREIGN KEY ("postPostId") REFERENCES "posts"("postId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_7699af221310daf20de0a5139f2" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
