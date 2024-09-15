import axios from 'axios';
import Course from '../models/course.model.js'; 

const OPENAI_API_KEY = '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';

export const courseSuggestions = async (req, res) => {
  const { prompt } = req.body;

  try {
    // Fetch all courses from the database
    const courses = await Course.find({});

    // Construct a prompt that includes the available courses for ChatGPT to analyze
    const courseDescriptions = courses.map(course => 
      `${course.title}: ${course.description}, Category: ${course.category}, Price: ${course.price}, Duration: ${course.duration} hours`
    ).join("\n");

    const fullPrompt = `${prompt}\n\nHere are the available courses:\n${courseDescriptions}\nPlease suggest the most relevant courses for the user. Provide the course titles only.`; // Updated prompt

    // Call ChatGPT API with the user prompt
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant who provides course suggestions based on user input.' },
          { role: 'user', content: fullPrompt },
        ],
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('GPT Response:', response.data);

    // Extract suggested titles from the response
    const gptResponse = response.data.choices[0].message.content;
    const suggestedTitles = gptResponse.split('\n').filter(line => line.trim() !== '')
      .map(title => title.replace(/^\d+\.\s*/, '').trim()); // Clean up the title strings

    console.log('Extracted Titles:', suggestedTitles);

    // Fetch suggested courses from the database using regex for partial matching
    const suggestedCourses = await Promise.all(
      suggestedTitles.map(title => 
        Course.find({
          title: { $regex: new RegExp(title, 'i') } // Case-insensitive regex search
        })
      )
    );

    // Flatten the array of arrays into a single array
    const flattenedCourses = suggestedCourses.flat();

    console.log('Suggested Courses:', flattenedCourses);

    res.json({ suggestions: flattenedCourses });
  } catch (error) {
    console.error('Error with ChatGPT API:', error);
    res.status(500).json({ error: 'Failed to get suggestions from ChatGPT' });
  }
};
