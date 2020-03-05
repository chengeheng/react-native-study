export const changeData = (stateId, data) => {
  return {type: 'UPDATE_DATA', stateId: stateId, value: data};
};
