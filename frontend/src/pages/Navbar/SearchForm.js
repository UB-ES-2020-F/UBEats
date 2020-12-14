import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import RestService from "../../api/restaurant.service";
//mes custamizable: https://material-ui.com/es/components/autocomplete/
const SearchForm = () => {
        const DEFAULT_RECOMMENDED = [{name:''}];
        const [inputValue, setInputValue] = useState('');
        const [recommendedRestList, setRecommendedRestList] = useState(DEFAULT_RECOMMENDED);
        const [restSelected, setRestSelected] = useState({});
        const [isRestSelected, setIsRestSelected] = useState(false);
        const [confirmationEnter, setConfirmationEnter] = useState(false);

        useEffect(() => {
                if (inputValue.length > 1){//si es fa >= 1 hi ha moltes mes recomanacions, no pero es menys practic, no se que volem.
                        fetchRecommendations();
                }
                if (inputValue.length <= 1){
                        setRecommendedRestList(DEFAULT_RECOMMENDED);
                }
        }, [inputValue]);


        const fetchRecommendations = async () => {
                const items = await RestService.getRecommendedRestaurants(inputValue);
                if (items.length>0){
                        setRecommendedRestList(items);
                }else{
                        setRecommendedRestList(DEFAULT_RECOMMENDED);
                }
        };

        const onEnterBehaviour = () => {
                //case there are restaurants matching with the current substring.
                if (recommendedRestList != DEFAULT_RECOMMENDED){
                        if (inputValue.toLowerCase().localeCompare(recommendedRestList[0].name.toLowerCase()) == 0 && inputValue.length > 0){
                                setRestSelected(recommendedRestList[0]);
                                setConfirmationEnter(true);
                        }
                        else  if (!isRestSelected){
                                setInputValue(recommendedRestList[0].name);
                                setRestSelected(recommendedRestList[0]);
                                setIsRestSelected(true);

                        }else{
                                setIsRestSelected(false);
                        }
                }
                //case there are no restaurants matching the current substring
                else{
                        setRecommendedRestList(DEFAULT_RECOMMENDED);
                }
        };

        function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
        }
              
        const reloadComponent = async () => {
                await sleep(100);
                setInputValue('');
                setIsRestSelected(false);
                setRecommendedRestList(DEFAULT_RECOMMENDED);
                setConfirmationEnter(false);
        };

        if (confirmationEnter){
                reloadComponent();
                return <Redirect to={{
                        pathname:'/profilerestaurant',
                        rest_id: restSelected.email,
                      }} />;
        }

        return (
                <Autocomplete
                        id="autocompleteform"
                        freeSolo
                        options={recommendedRestList}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 450}}
                        renderInput={(params) =>  <TextField 
                                                        {...params} 
                                                        placeholder='Search'
                                                        onKeyDown={ e => {
                                                                if (e.key === 'Enter'){
                                                                        onEnterBehaviour();
                                                                }
                                                        }}                                                   
                                                />}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => { 
                                if (newInputValue.length>=0){
                                        setInputValue(newInputValue)
                                }
                        }}
                />
        );
}
export default SearchForm;