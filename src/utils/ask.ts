export const ask = async (question: string): Promise<string> => {
  let answer = "";

  console.write(question);
  console.write("\n");

  for await (const line of console) {
    answer = line;
    break;
  }

  return answer;
};
