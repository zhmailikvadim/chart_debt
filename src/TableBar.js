import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { ButtonToolbar } from 'react-bootstrap';
import './TableBar.css';
const debt = 'debt'
const debtOver = 'debt_over'
const debtAndOver = 'debt_and_over'
class TableBar extends Component {
    render()
    {
        let debt_act;
        let debt_over_act;
        let debt_and_over_act;
        if (this.props.chartType === debt)
        {
            debt_act = true
            debt_over_act = false
            debt_and_over_act = false
        }
        if (this.props.chartType === debtOver)
        {
            debt_act = false
            debt_over_act = true
            debt_and_over_act = false
        }   
        if (this.props.chartType === debtAndOver)
        {
            debt_act = false
            debt_over_act = false
            debt_and_over_act = true

        }               
    return (
        <ButtonToolbar id = 'buttons'>
            <Button type="button" variant="outline-info" size="sm" active = {debt_act}
                onClick={() => this.props.onDebt()} >Вся дебиторская задолженность
            </Button>
            <Button type="button" variant="outline-danger" size="sm" active = {debt_over_act}
                onClick={() => this.props.onDebtOver()} >Просроченная дебиторская задолженность
            </Button> 
            <Button type="button" variant="outline-primary" size="sm" active = {debt_and_over_act}
                onClick={() => this.props.onDebtAndOver()} >Дебиторская задолженность без стран
            </Button>                                           
        </ButtonToolbar>
    )
}}
export default TableBar;