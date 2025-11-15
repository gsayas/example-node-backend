export interface ProfessionEarnings {
  profession: string;
  earnings: number;
}

function createProfessionEarnings(
  profession: string,
  earnings: number
): ProfessionEarnings {
  return {
    profession,
    earnings,
  };
}

export default createProfessionEarnings;
