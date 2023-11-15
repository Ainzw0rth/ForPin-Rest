-- CreateTable
CREATE TABLE "Premium_user" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_path" TEXT NOT NULL,

    CONSTRAINT "Premium_user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Exclusive_content" (
    "post_id" SERIAL NOT NULL,
    "caption" TEXT NOT NULL,
    "descriptions" TEXT NOT NULL,
    "post_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "genre" TEXT NOT NULL,
    "premium_user_id" INTEGER NOT NULL,

    CONSTRAINT "Exclusive_content_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "Exclusive_media" (
    "media_id" SERIAL NOT NULL,
    "media_path" TEXT NOT NULL,
    "media_post_id" INTEGER NOT NULL,

    CONSTRAINT "Exclusive_media_pkey" PRIMARY KEY ("media_id")
);

-- CreateTable
CREATE TABLE "Premium_admin" (
    "admin_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_path" TEXT NOT NULL,

    CONSTRAINT "Premium_admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Premium_user_email_key" ON "Premium_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Premium_user_username_key" ON "Premium_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Premium_user_user_id_email_key" ON "Premium_user"("user_id", "email");

-- AddForeignKey
ALTER TABLE "Exclusive_content" ADD CONSTRAINT "Exclusive_content_premium_user_id_fkey" FOREIGN KEY ("premium_user_id") REFERENCES "Premium_user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exclusive_media" ADD CONSTRAINT "Exclusive_media_media_post_id_fkey" FOREIGN KEY ("media_post_id") REFERENCES "Exclusive_content"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;
