import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1763497066524 implements MigrationInterface {
  name = 'AddUserTable1763497066524';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_status_enum" AS ENUM('invited', 'registered', 'active', 'suspended', 'deleted')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying(255), "last_name" character varying(255), "email" character varying(255), "role" integer NOT NULL DEFAULT '3', "phone_number" character varying(20), "password_hash" character varying(255), "refresh_token_hash" character varying(255), "status" "public"."user_status_enum" NOT NULL DEFAULT 'invited', "one_time_token" character varying(64), "terms_and_conditions" boolean NOT NULL DEFAULT false, "email_notifications" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "invited_by" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "focus_areas" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "category" character varying(50) NOT NULL, "description" text, "cefr_levels" text array NOT NULL DEFAULT '{}', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7e84517f63bdb39e057725e539e" UNIQUE ("name", "category"), CONSTRAINT "PK_317abcba4c7147c28f58c875870" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_672fd298291e68e4c2e15484dc" ON "focus_areas" ("cefr_levels") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_52124e0f81e19f6e3aa7e28376" ON "focus_areas" ("category") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_469d714b3d2bec0d6485c3c067e" FOREIGN KEY ("invited_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_469d714b3d2bec0d6485c3c067e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_52124e0f81e19f6e3aa7e28376"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_672fd298291e68e4c2e15484dc"`,
    );
    await queryRunner.query(`DROP TABLE "focus_areas"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
  }
}
