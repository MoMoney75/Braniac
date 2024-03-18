import axios from "axios";
const BASE_URL = 'https://opentdb.com/api.php?';


class GameApi{
    static token = null;
    /*generate a session token for appending to API request
     https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE
    gets deleted after 6 hours of inactivity */

    static async createToken(){
        const getTokenUrl = 'https://opentdb.com/api_token.php?command=request'
        const result = await axios.get(getTokenUrl)
        this.token = result.data.token
        return this.token
    }

    /* retrieves new token once the original tokan expires */
    static async resetToken(token) {
        try {
          this.token = token;
          const resetTokenUrl = `https://opentdb.com/api_token.php?command=reset&token=${this.token}`;
          const result = await axios.get(resetTokenUrl);
          this.token = result.data.token;
          return this.token;
        } catch (error) {
          console.error('Error resetting token:', error);
          throw error;
        }
    }


    /*Only 1 Category can be requested per API Call. 
    To get questions from any category, don't specify a category.
    Maximum of 50 Questions can be retrieved per call. */
    static async getCategories(){
        try{
        const categoriesURl = 'https://opentdb.com/api_category.php'
        let result = await axios.get(categoriesURl);
        return result;
    }
        catch{
            throw new Error("BAD REQUEST ERROR", 404)
        }
    }
    
    /** MAIN API CALL, Will get questions based on user form inputs */
    static async getQuestions(amount,type,difficulty, category){

        try{
            const questionData = [];
            await this.createToken();
        
            let url ; 
            if(type !== 'null'){
            url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&
            difficulty=${difficulty}&type=${type}&token=${this.token}`
        } else{
            url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&
            difficulty=${difficulty}&token=${this.token}`
    
        }
        let result = await axios.get(url);
        console.log("GAMEAPI SAYS:", result)


        /* handles token reset when token expires */
        if(result.data.response_code === 3 || result.data.response_code === 4){
            await this.createToken();
        }

        /* handles token reset when all possible questions
           have been retrieved */
        if(result.data.response_code === 4 ){
            await this.resetToken();
        }

        /* loop through results and pick out needed information
            for QuestionCard, makes easier to swift through data */
        for (let i = 0; i < result.data.results.length; i++) {
            const questionObject = {};
            questionObject.question = result.data.results[i].question;
            questionObject.correctAnswer = result.data.results[i].correct_answer;
            questionObject.incorrectAnswers = result.data.results[i].incorrect_answers;
            questionObject.category = result.data.results[i].category
            questionData.push(questionObject);
        }
        return questionData;
    }
        catch(e){
            console.log(e)
            throw new Error("BAD REQUEST ERROR", 404);
        }
    }
}


export default GameApi;
