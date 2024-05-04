export const getJobs = async (offset) => {
  try {
    const URL = `https://api.weekday.technology/adhoc/getSampleJdJSON`;

    const requestBody = {
      limit: 10,
      offset: offset,
    };

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
