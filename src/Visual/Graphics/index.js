import Circle from './Circle'

export default (creator) => {
  return {
    Circle: Circle(creator)
  }
}