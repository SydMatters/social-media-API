import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721578746296 implements MigrationInterface {
    name = 'Migration1721578746296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_0ddfafc6ae13de3ae3e24b36dd4"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_1a1d776480039886645c32c0e15"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "userUserId"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "postPostId"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "postId" uuid`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("postId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "postId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "postPostId" uuid`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "userUserId" uuid`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_1a1d776480039886645c32c0e15" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_0ddfafc6ae13de3ae3e24b36dd4" FOREIGN KEY ("postPostId") REFERENCES "posts"("postId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
