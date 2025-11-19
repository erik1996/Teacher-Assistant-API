import { MigrationInterface, QueryRunner } from "typeorm";

export class InitalMigration1763583388621 implements MigrationInterface {
    name = 'InitalMigration1763583388621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('invited', 'registered', 'active', 'suspended', 'deleted')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying(255), "last_name" character varying(255), "email" character varying(255), "role" integer NOT NULL DEFAULT '3', "phone_number" character varying(20), "password_hash" character varying(255), "refresh_token_hash" character varying(255), "status" "public"."user_status_enum" NOT NULL DEFAULT 'invited', "one_time_token" character varying(64), "terms_and_conditions" boolean NOT NULL DEFAULT false, "email_notifications" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "invited_by" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subjects" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "code" character varying(3) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "rtl" boolean NOT NULL DEFAULT false, "system_prompt" text, "user_prompt" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_542cbba74dde3c82ab49c573109" UNIQUE ("code"), CONSTRAINT "UQ_542cbba74dde3c82ab49c573109" UNIQUE ("code"), CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_542cbba74dde3c82ab49c57310" ON "subjects" ("code") `);
        await queryRunner.query(`CREATE TABLE "proficiency_levels" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "name" character varying(100) NOT NULL, "display_order" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "config" jsonb, "system_prompt" text, "user_prompt" text, "subject_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cea56d60c4a616522f60ee62ea2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_529c3f125eefa5a6c367c6d907" ON "proficiency_levels" ("subject_id", "code") `);
        await queryRunner.query(`CREATE TABLE "skill_categories" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "display_order" integer NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "config" jsonb, "system_prompt" text, "user_prompt" text, "subject_id" integer NOT NULL, "proficiency_level_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_efce364bf7be7b92b7d7f948663" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1ee360b8af8404109f5393f600" ON "skill_categories" ("subject_id", "proficiency_level_id", "name") `);
        await queryRunner.query(`CREATE INDEX "IDX_a99e73db7d2fec4b5ce365029d" ON "skill_categories" ("name") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_469d714b3d2bec0d6485c3c067e" FOREIGN KEY ("invited_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proficiency_levels" ADD CONSTRAINT "FK_23a212a0a1fb383471dbd3d4764" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skill_categories" ADD CONSTRAINT "FK_8b3f4c1e200665b1d313d88bc4b" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skill_categories" ADD CONSTRAINT "FK_313457429b76113cefe6fb33814" FOREIGN KEY ("proficiency_level_id") REFERENCES "proficiency_levels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill_categories" DROP CONSTRAINT "FK_313457429b76113cefe6fb33814"`);
        await queryRunner.query(`ALTER TABLE "skill_categories" DROP CONSTRAINT "FK_8b3f4c1e200665b1d313d88bc4b"`);
        await queryRunner.query(`ALTER TABLE "proficiency_levels" DROP CONSTRAINT "FK_23a212a0a1fb383471dbd3d4764"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_469d714b3d2bec0d6485c3c067e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a99e73db7d2fec4b5ce365029d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ee360b8af8404109f5393f600"`);
        await queryRunner.query(`DROP TABLE "skill_categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_529c3f125eefa5a6c367c6d907"`);
        await queryRunner.query(`DROP TABLE "proficiency_levels"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_542cbba74dde3c82ab49c57310"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    }

}
