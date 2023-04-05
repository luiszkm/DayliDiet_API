import { InvalidMealsCredentialsErro } from "../errors/invalid-credentials-error";
import { MealsRepository } from "../repository/mealsRepository";

interface IUserProps {
  user_id: string
  lastSequencilyDaysSuccess: Date
  sequencilyDaysSuccess: number
}



export class MetricsMealsUseCase {
  constructor(private mealsRespository: MealsRepository) {
    this.mealsRespository = mealsRespository;
  }
  async exceute({ user_id, lastSequencilyDaysSuccess , sequencilyDaysSuccess }:IUserProps ) {
    const meals = await this.mealsRespository.list(user_id)
    if (!meals) throw new InvalidMealsCredentialsErro()
    const melasIsDiet = meals.filter(item => item.props.isDiet === true)
    const melasIsNotDiet = meals.filter(item => item.props.isDiet === false)

    // function diffDate(startDate: Date, endDate: Date): number {
    //   var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    //   var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    //   if (startDate > endDate) return 0

    //   return diffDays
    // }
    // sequencilyDaysSuccess =diffDate(lastSequencilyDaysSuccess, new Date(`2023-03-11`)) 

    let sequencilyDay = []

     meals.filter(item => {
     const created_at = item.props.created_at
     if (created_at === undefined) return
      return created_at > lastSequencilyDaysSuccess
    }).filter(item => {
      const sequenci = item.props.isDiet === true
      sequencilyDay.push(item)
      if(!sequenci)  return sequencilyDay =[]
      return sequenci 
    })

    return {
      meals,
      melasIsDiet,
      melasIsNotDiet,
      sequencilyDay: sequencilyDay.length
    }
  }
}