-- CreateTable
CREATE TABLE "premium_user" (
    "user_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_path" TEXT NOT NULL,
    "premium_post_id" INTEGER NOT NULL,

    CONSTRAINT "premium_user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "exclusive_content" (
    "post_id" INTEGER NOT NULL,
    "caption" TEXT NOT NULL,
    "descriptions" TEXT NOT NULL,
    "post_time" TIMESTAMP(3) NOT NULL,
    "likes" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,

    CONSTRAINT "exclusive_content_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "premium_admin" (
    "admin_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_path" TEXT NOT NULL,

    CONSTRAINT "premium_admin_pkey" PRIMARY KEY ("admin_id")
);
