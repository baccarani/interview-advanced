interface QueryObject {
  order: string
  sort: string
  page: string
}

export const queryValidator = (
  route: string,
  queryObject: QueryObject
): { pageNum: number; sortObject: { [key: string]: 1 | -1 } } => {
  switch (route) {
    case 'interviews':
      return queryStringValidator(
        ['_id'],
        ['asc', 'ascending', 'desc', 'descending'],
        queryObject
      )
    case 'feedback_transcripts':
      return queryStringValidator(
        ['_id'],
        ['asc', 'ascending', 'desc', 'descending'],
        queryObject
      )
    default:
      return { pageNum: 1, sortObject: { _id: 1 } }
  }
}

const queryStringValidator = (
  validSortFields: Array<string>,
  validOrders: Array<string>,
  queryObject: { order: string; sort: string; page: string }
): {
  sortObject: {
    [key: string]: 1 | -1
  }
  pageNum: number
} => {
  let { order, page, sort } = queryObject
  let sortOrder: 1 | -1 = 1

  // Validate Page Number
  let pageNum = parseInt(page, 10)
  if (isNaN(pageNum) || pageNum < 1) {
    pageNum = 1
  }

  // Validate Sort Order
  if (validOrders.includes(order.toLowerCase())) {
    sortOrder =
      order.toLowerCase() === 'asc' || order.toLowerCase() === 'ascending'
        ? 1
        : -1
  } else {
    order = 'desc'
  }

  // Validate Sort Options
  if (!validSortFields.includes(sort)) {
    sort = '_id'
  }

  // Create Sort Object
  const sortObject: { [key: string]: 1 | -1 } = { [sort]: sortOrder }

  return { pageNum, sortObject }
}
