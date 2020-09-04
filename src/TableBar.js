import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { ButtonToolbar } from 'react-bootstrap';
import './TableBar.css';
class TableBar extends Component {
    render()
    {
        let debt;
        let debt_over;
        if (this.props.chartType === 'debt')
        {
            debt = true
            debt_over = false
        }
        if (this.props.chartType === 'debt_over')
        {
            debt = false
            debt_over = true
        }        
    return (
        <ButtonToolbar>
            <Button type="button" variant="outline-info" size="sm" active = {debt}
                onClick={() => this.props.onDebt()} >Вся дебиторская задолженность
            </Button>
            <Button type="button" variant="outline-danger" size="sm" active = {debt_over}
                onClick={() => this.props.onDebtOver()} >Просроченная дебиторская задолженность
            </Button>                             
        </ButtonToolbar>
    )
}}
export default TableBar;