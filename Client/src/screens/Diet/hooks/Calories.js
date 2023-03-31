import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTrackedFood } from './Food';

const serverURL = process.env.URL;
const currentDate = new Date().toISOString().split('T')[0];
const usingDeployedServer = process.env.USING_DEPLOYED_SERVER;
const ipAddress = process.env.IP_ADDRESS;
const port = process.env.PORT;

// For testing purposes
// Update this with your own UrlService

export async function getGeneralCalorieGoal(UserID) {
  let url = `${serverURL}/api/food/calorieTrack/General.${UserID}`;
  if (!usingDeployedServer) {
    url = `http://${ipAddress}:${port}/api/food/calorieTrack/General.${UserID}`;
  }
  let response;
  try {
    const { token } = JSON.parse(await AsyncStorage.getItem('user'));
    response = await fetch(url, {
      method: 'GET',
      headers: {
        authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    response = await response.json();
  } catch (error) {
    return error;
  }
  return response;
}

export async function addCalorieGoal(UserID, CalorieGoal, Date = currentDate) {
  let url = `${serverURL}/api/food/calorieTrack/createCalorieLog`;
  if (!usingDeployedServer) {
    url = `http://${ipAddress}:${port}/api/food/calorieTrack/createCalorieLog`;
  }
  let response;
  try {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        CalorieGoal,
        UserID,
        Date,
      }),
    });
    response = await response.json();
  } catch (error) {
    return error;
  }
  // Return the response
  return response;
}

export async function getLatestCalorieGoal(UserID, inputDate = '') {
  // Get the all the calorie goals for the user
  let data = await getGeneralCalorieGoal(UserID);
  if (data.length === 0) {
    await addCalorieGoal(UserID, 2000, new Date().toISOString().split('T')[0]);
    data = await getGeneralCalorieGoal(UserID);
  }
  // If a date is passed in, filter the data to only include calorie goals before the date
  if (inputDate !== '') {
    data = data.filter((item) => item.Date <= inputDate);
  }
  // Return the latest calorie goal
  if (data.length === 0) {
    return -1;
  }
  return data.reduce((acc, curr) => (new Date(curr.Date) > new Date(acc.Date) ? curr : acc));
}

export async function getCaloriesRemaining(UserID, Date, calorieGoal = -1) {
  // Get the total calories for the day
  const food = await getTrackedFood(Date, UserID);
  let totalCalories = 0;

  // If there is no food logged for the day, return the calorie goal
  if (food.length !== 0) {
    totalCalories = food.reduce((acc, curr) => acc + curr.CaloriesInMeal, 0);
  }

  // If no calorie goal is passed in, get the latest calorie goal using the api call,
  // otherwise use the passed in calorie goal
  if (calorieGoal === -1) {
    const { CalorieGoal } = await getLatestCalorieGoal(UserID);
    return Number((CalorieGoal - totalCalories).toFixed(0));
  }
  return Number((calorieGoal - totalCalories).toFixed(0));
}

export async function updateCalorieGoal(UserID, CalorieGoal, Date = currentDate) {
  // Get the latest calorie goal
  const currentCalorieGoal = await getLatestCalorieGoal(UserID);
  let url = `${serverURL}/api/food/calorieTrack/`;
  if (!usingDeployedServer) {
    url = `http://${ipAddress}:${port}/api/food/calorieTrack/`;
  }
  let inputData = {};

  // If the latest calorie goal is for the current date, update the calorie goal
  // otherwise create a new calorie goal
  const intCalorieGoal = parseInt(CalorieGoal, 10);
  if (currentCalorieGoal.Date === currentDate) {
    url += 'updateCalories';
    inputData = {
      CalorieGoal: intCalorieGoal,
      id: currentCalorieGoal.id,
    };
  } else {
    url += 'createCalorieLog';

    inputData = {
      CalorieGoal: intCalorieGoal,
      UserID,
      Date,
    };
  }

  // Make the api call
  let response;
  try {
    const { token } = JSON.parse(
      (await AsyncStorage.getItem('user')),
    );
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify(inputData),
    });
    response = await response.json();
  } catch (error) {
    return error;
  }
  // Return the response
  return response;
}
