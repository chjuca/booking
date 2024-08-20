export const postData = async (url: string, data: any) => {
  let options: RequestInit = {
    method: 'POST',
  };

  if (data instanceof FormData) {
    options.body = data;
  } else {
    options.headers = {
      'Content-Type': 'application/json',
    };
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};