CREATE TABLE "file" (
  "fileId" int4 NOT NULL,
  "name" varchar(255),
  "description" varchar(255),
  "datetime" date,
  "storageSize" float8,
  "createdBy" int4,
  PRIMARY KEY ("fileId")
);

CREATE TABLE "role" (
  "roleId" int4 NOT NULL,
  "rolename" varchar(255),
  PRIMARY KEY ("roleId")
);

CREATE TABLE "user" (
  "userId" SERIAL PRIMARY KEY,
  "username" varchar(255),
  "password" varchar(255),
  "roleId" int4,
  CONSTRAINT "fk_user_role" FOREIGN KEY ("roleId") REFERENCES "role" ("roleId")
);

ALTER TABLE "file" ADD CONSTRAINT "fk_file_user_createdBy" FOREIGN KEY ("createdBy") REFERENCES "user" ("userId");
ALTER TABLE "role" ADD CONSTRAINT "fk_role_role_1" FOREIGN KEY ("roleId") REFERENCES "user" ("role");

