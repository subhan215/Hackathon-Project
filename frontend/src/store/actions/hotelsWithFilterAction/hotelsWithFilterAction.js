import { removeDuplicateObjectFromArray } from "../../../functions/removeDuplicate";
import ActionType from "../../constants/constant";

const hotelsWithFilterFunc = (selectedArr, hotels) => {
    return (dispatch) => {
        let roomServicesMatching = [];
        let roomDetailsMatching = [];
        let servicesMatching = [];
        let indexes = []
        let newHotelsArr = []
        if (selectedArr != []) {

            for (var i = 0; i < hotels.length; i++) {

                roomServicesMatching = [...roomServicesMatching, ...selectedArr.filter((obj) => {
                    return hotels[i].Services_of_Rooms.indexOf(obj.value) !== -1
                })]
            }
        }
        roomServicesMatching = removeDuplicateObjectFromArray(roomServicesMatching, "value")
        for (var i = 0; i < hotels.length; i++) {

            roomDetailsMatching = [...roomDetailsMatching, ...selectedArr.filter((obj) => {
                return hotels[i].Room_Details.indexOf(obj.value) !== -1
            })]
        }
        roomDetailsMatching = removeDuplicateObjectFromArray(roomDetailsMatching, "value")
        for (var i = 0; i < hotels.length; i++) {

            servicesMatching = [...servicesMatching, ...selectedArr.filter((obj) => {
                return hotels[i].Services.indexOf(obj.value) !== -1
            })]
        }
        servicesMatching = removeDuplicateObjectFromArray(servicesMatching, "value")
        if (roomDetailsMatching !== []) {
            for (var i = 0; i < hotels.length; i++) {

                roomDetailsMatching.filter((obj) => {
                    if (hotels[i].Room_Details.includes(obj.value) === true) {
                        indexes = [...indexes, i]
                    }

                })
            }
        }
        if (roomServicesMatching !== []) {
            for (var i = 0; i < hotels.length; i++) {

                roomServicesMatching.filter((obj) => {
                    if (hotels[i].Services_of_Rooms.includes(obj.value) === true) {
                        indexes = [...indexes, i]
                    }

                })
            }
        }
        if (servicesMatching !== []) {
            for (var i = 0; i < hotels.length; i++) {

                servicesMatching.filter((obj) => {
                    if (hotels[i].Services.includes(obj.value) === true) {
                        indexes = [...indexes, i]
                    }
                })
            }
        }
        indexes = [...new Set(indexes)]
        indexes = indexes.sort((a, b) => b - a) // Ascend Order is tarah hoga
        if (indexes.length > 0) {
            for (var i = 0; i < indexes.length; i++) {
                newHotelsArr = [...newHotelsArr, hotels[indexes[i]]]

            }

        }
        console.log(newHotelsArr)
        dispatch({
            type: ActionType.hotelsWithFilter,
            payload: newHotelsArr
        })

    }
}
export { hotelsWithFilterFunc }