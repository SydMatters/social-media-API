import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721578121988 implements MigrationInterface {
    name = 'Migration1721578121988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Followers" DROP CONSTRAINT "FK_2b09ef261e4f2ea0b70aa300278"`);
        await queryRunner.query(`ALTER TABLE "Followers" DROP CONSTRAINT "FK_39afc344fa3d4b3ffe58d3427af"`);
        await queryRunner.query(`ALTER TABLE "Followers" DROP COLUMN "followingId"`);
        await queryRunner.query(`ALTER TABLE "Followers" DROP COLUMN "followerUserId"`);
        await queryRunner.query(`ALTER TABLE "Followers" DROP COLUMN "followingUserId"`);
        await queryRunner.query(`ALTER TABLE "Followers" ADD "followingid" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Followers" DROP COLUMN "followerId"`);
        await queryRunner.query(`ALTER TABLE "Followers" ADD "followerId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Followers" ADD CONSTRAINT "FK_cccee741c1cf2e3dfe04a00b1f7" FOREIGN KEY ("followerId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Followers" ADD CONSTRAINT "FK_48cbab840af226d48e98dac8a15" FOREIGN KEY ("followingid") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Followers" DROP CONSTRAINT "FK_48cbab840af226d48e98dac8a15"`);
        await queryRunner.query(`ALTER TABLE "Followers" DROP CONSTRAINT "FK_cccee741c1cf2e3dfe04a00b1f7"`);
        await queryRunner.query(`ALTER TABLE "Followers" DROP COLUMN "followerId"`);
        await queryRunner.query(`ALTER TABLE "Followers" ADD "followerId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Followers" DROP COLUMN "followingid"`);
        await queryRunner.query(`ALTER TABLE "Followers" ADD "followingUserId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Followers" ADD "followerUserId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Followers" ADD "followingId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Followers" ADD CONSTRAINT "FK_39afc344fa3d4b3ffe58d3427af" FOREIGN KEY ("followerUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Followers" ADD CONSTRAINT "FK_2b09ef261e4f2ea0b70aa300278" FOREIGN KEY ("followingUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
