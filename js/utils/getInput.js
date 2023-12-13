export default async function getInput(year = 2023, day) {
  const target = new URL(
    `/${year}/day/${day.replace("day", "")}/input`,
    `https://adventofcode.com`,
  );
  const res = await fetch(target, {
    headers: {
      Cookie: `session=${process.env.SESSION_ID}`,
    },
  });
  return await res.text();
}
