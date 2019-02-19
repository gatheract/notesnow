export default class Score {
  /**
   * When progress reaches 0 it's game over
   * @param mistakesAllowed 
   * @param right 
   * @param wrong 
   */
  public static calcProgress(
    mistakesAllowed: number, right: number, wrong: number
    ) {
      let res =  mistakesAllowed - wrong + (right / 3)
      /**
       * Progress shouldn't be more than 10 or less than 0
       */
      if (res > 10) {
        res = 10 
      } else if (res < 0) {
        res = 0
      }
      return res
  }
}
