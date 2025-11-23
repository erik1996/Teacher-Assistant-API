import { MigrationInterface, QueryRunner } from "typeorm";

export class InitaialMigration1763924278088 implements MigrationInterface {
    name = 'InitaialMigration1763924278088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('invited', 'registered', 'active', 'suspended', 'deleted')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying(255), "last_name" character varying(255), "email" character varying(255), "role" integer NOT NULL DEFAULT '3', "phone_number" character varying(20), "password_hash" character varying(255), "refresh_token_hash" character varying(255), "status" "public"."user_status_enum" NOT NULL DEFAULT 'invited', "one_time_token" character varying(64), "terms_and_conditions" boolean NOT NULL DEFAULT false, "email_notifications" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "invited_by" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subjects" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "code" character varying(3) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "rtl" boolean NOT NULL DEFAULT false, "system_prompt" text, "user_prompt" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_542cbba74dde3c82ab49c573109" UNIQUE ("code"), CONSTRAINT "UQ_542cbba74dde3c82ab49c573109" UNIQUE ("code"), CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_542cbba74dde3c82ab49c57310" ON "subjects" ("code") `);
        await queryRunner.query(`CREATE TABLE "skill_categories" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "display_order" integer NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "subject_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_efce364bf7be7b92b7d7f948663" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c3d7d9994d76ff5b46a5990f04" ON "skill_categories" ("subject_id", "name") `);
        await queryRunner.query(`CREATE INDEX "IDX_a99e73db7d2fec4b5ce365029d" ON "skill_categories" ("name") `);
        await queryRunner.query(`CREATE TABLE "question_types" ("id" SERIAL NOT NULL, "code" character varying(50) NOT NULL, "name" character varying(100) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "structure" jsonb NOT NULL, "config" jsonb NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e5d09e90637c45cf6644e1aead8" UNIQUE ("code"), CONSTRAINT "UQ_e5d09e90637c45cf6644e1aead8" UNIQUE ("code"), CONSTRAINT "PK_6351ae77232205c3ee112cfb7f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e5d09e90637c45cf6644e1aead" ON "question_types" ("code") `);
        await queryRunner.query(`CREATE TABLE "question_variations" ("id" SERIAL NOT NULL, "code" character varying(100) NOT NULL, "name" character varying(100) NOT NULL, "display_order" integer NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "config" jsonb, "examples" jsonb, "user_prompt" text, "skill_category_id" integer NOT NULL, "question_type_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_398d5a21dd51ea2cb4b487421d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b770455e922420a21f97e42fa3" ON "question_variations" ("code") `);
        await queryRunner.query(`CREATE INDEX "IDX_86cae92851289528a013fe8108" ON "question_variations" ("question_type_id", "skill_category_id") `);
        await queryRunner.query(`CREATE TABLE "proficiency_levels" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "name" character varying(100) NOT NULL, "display_order" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "subject_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cea56d60c4a616522f60ee62ea2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_529c3f125eefa5a6c367c6d907" ON "proficiency_levels" ("subject_id", "code") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_469d714b3d2bec0d6485c3c067e" FOREIGN KEY ("invited_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skill_categories" ADD CONSTRAINT "FK_8b3f4c1e200665b1d313d88bc4b" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_variations" ADD CONSTRAINT "FK_05e118716cd072d5ee4375a68f2" FOREIGN KEY ("question_type_id") REFERENCES "question_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_variations" ADD CONSTRAINT "FK_474168df780b210afb6680fc1e3" FOREIGN KEY ("skill_category_id") REFERENCES "skill_categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proficiency_levels" ADD CONSTRAINT "FK_23a212a0a1fb383471dbd3d4764" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proficiency_levels" DROP CONSTRAINT "FK_23a212a0a1fb383471dbd3d4764"`);
        await queryRunner.query(`ALTER TABLE "question_variations" DROP CONSTRAINT "FK_474168df780b210afb6680fc1e3"`);
        await queryRunner.query(`ALTER TABLE "question_variations" DROP CONSTRAINT "FK_05e118716cd072d5ee4375a68f2"`);
        await queryRunner.query(`ALTER TABLE "skill_categories" DROP CONSTRAINT "FK_8b3f4c1e200665b1d313d88bc4b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_469d714b3d2bec0d6485c3c067e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_529c3f125eefa5a6c367c6d907"`);
        await queryRunner.query(`DROP TABLE "proficiency_levels"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_86cae92851289528a013fe8108"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b770455e922420a21f97e42fa3"`);
        await queryRunner.query(`DROP TABLE "question_variations"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e5d09e90637c45cf6644e1aead"`);
        await queryRunner.query(`DROP TABLE "question_types"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a99e73db7d2fec4b5ce365029d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c3d7d9994d76ff5b46a5990f04"`);
        await queryRunner.query(`DROP TABLE "skill_categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_542cbba74dde3c82ab49c57310"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    }

}
