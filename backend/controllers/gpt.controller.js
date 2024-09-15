// import axios from 'axios';
// import Course from '../models/course.model.js'; 


// // Replace this with your OpenAI API key
// const OPENAI_API_KEY = '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';

// // ChatGPT course suggestion route
// export const courseSuggestions = async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     // Fetch all courses from the database
//     const courses = await Course.find({});

//     // Construct a prompt that includes the available courses for ChatGPT to analyze
//     const courseDescriptions = courses.map(course => `${course.title}: ${course.description}`).join("\n");

//     const fullPrompt = `${prompt}\n\nHere are the available courses:\n${courseDescriptions}\nPlease suggest the most relevant courses for the user.`;

//     // Call ChatGPT API with the user prompt
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: 'gpt-3.5-turbo', // Use the correct model
//         messages: [
//           { role: 'system', content: 'You are a helpful assistant who provides course suggestions based on user input.' },
//           { role: 'user', content: fullPrompt },
//         ],
//         max_tokens: 500,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${OPENAI_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     // Send back the response from ChatGPT
//     const suggestions = response.data.choices[0].message.content;
//     res.json({ suggestions });

//   } catch (error) {
//     console.error('Error with ChatGPT API:', error);
//     res.status(500).json({ error: 'Failed to get suggestions from ChatGPT' });
//   }
// };



import axios from 'axios';
import Course from '../models/course.model.js'; 

const OPENAI_API_KEY = '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';

export const courseSuggestions = async (req, res) => {
  const { prompt } = req.body;

  try {
    const courses = await Course.find({});
    const courseDescriptions = courses.map(course => 
      `${course.title}: ${course.description}, Category: ${course.category}, Price: ${course.price}, Duration: ${course.duration} hours`
    ).join("\n");

    const fullPrompt = `${prompt}\n\nHere are the available courses:\n${courseDescriptions}\nPlease suggest the most relevant courses for the user. Provide the course titles and descriptions.`;

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

    const gptResponse = response.data.choices[0].message.content;
    const suggestedTitles = gptResponse.split('\n').filter(line => line).map(line => {
        const match = line.match(/^\d+\.\s*([^\-:]+)/);
      return match ? match[1].replace(/[\*\_]/g, '').trim() : null;
    }).filter(title => title);

    console.log('Extracted Titles:', suggestedTitles);

    const suggestedCourses = await Course.find({
      title: { $in: suggestedTitles.map(title => title.trim()) }
    });

    console.log('Suggested Courses:', suggestedCourses);

    res.json({ suggestions: suggestedCourses });
  } catch (error) {
    console.error('Error with ChatGPT API:', error);
    res.status(500).json({ error: 'Failed to get suggestions from ChatGPT' });
  }
};

