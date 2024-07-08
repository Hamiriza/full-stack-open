import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
const PORT = 3003;
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  try {
    const heightValue: number = parseFloat(height as string);
    const weightValue: number = parseFloat(weight as string);

    if (isNaN(heightValue) || isNaN(weightValue)) {
      throw Error();
    }

    const bmi: string = calculateBmi(heightValue, weightValue);
    return res.json({
      weight: weightValue,
      height: heightValue,
      bmi: bmi,
    });
  } catch (error) {
    return res.status(404).json({
      error: "malfomatted parameters",
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises: dailyExercises, target } = req.body;

  if (!dailyExercises || !target) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  if (
    !Array.isArray(dailyExercises) ||
    dailyExercises.some(isNaN) ||
    isNaN(target as number)
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const result = calculateExercises(
    dailyExercises as number[],
    target as number
  );

  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on localhost ${PORT}`);
});
