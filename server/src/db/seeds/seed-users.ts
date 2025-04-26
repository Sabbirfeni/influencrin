import User from "../../models/user-model";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt"; // ➔ Import bcrypt for hashing

interface UserAttributes {
  fullname: string;
  email: string;
  password_hash: string;
}

export async function seedUsers(count: number = 10): Promise<void> {
  const users: UserAttributes[] = [];

  for (let i = 0; i < count; i++) {
    const plainPassword = faker.internet.password({ length: 10 });

    const hashedPassword = await bcrypt.hash(plainPassword, 10); // ➔ Hash password with saltRounds = 10

    users.push({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: hashedPassword,
    });
  }

  console.log(`🔵 Seeding ${count} users...`);
  const startTime = process.hrtime.bigint(); // high precision timer

  await User.bulkCreate(users);

  const endTime = process.hrtime.bigint();
  const durationNs = endTime - startTime;
  const durationSeconds = Number(durationNs) / 1e9;
  const rate = (count / durationSeconds).toFixed(2);

  console.log(
    `✅ Seeded ${count} users in ${durationSeconds.toFixed(2)} seconds.`
  );
  console.log(`⚡ Speed: ${rate} users/second.`);
}
