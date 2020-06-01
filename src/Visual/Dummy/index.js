import Circle from './Circle'
import Rectangle from './Rectangle'

export default (creator) => {
  return {
    Circle: Circle(creator),
    Rectangle: Rectangle(creator)
  }
}