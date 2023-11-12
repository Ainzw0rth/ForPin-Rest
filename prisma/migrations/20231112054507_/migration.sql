-- AlterTable
CREATE SEQUENCE exclusive_content_post_id_seq;
ALTER TABLE "exclusive_content" ALTER COLUMN "post_id" SET DEFAULT nextval('exclusive_content_post_id_seq');
ALTER SEQUENCE exclusive_content_post_id_seq OWNED BY "exclusive_content"."post_id";

-- AlterTable
CREATE SEQUENCE premium_user_user_id_seq;
ALTER TABLE "premium_user" ALTER COLUMN "user_id" SET DEFAULT nextval('premium_user_user_id_seq');
ALTER SEQUENCE premium_user_user_id_seq OWNED BY "premium_user"."user_id";
