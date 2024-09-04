export const mergeEventarrays = (array1, array2) => {
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (array1[i].id === array2[j].id) {
          array2.splice(j, 1)
        }
      }
    }
    return [...array1, array2].flat(2)
}