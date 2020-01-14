import React from 'react'
import {connect} from 'react-redux'

//cores
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

function Setting(props){

    const getTemplateComponent = (template)=>{
        const comp = 
        (<Container>
            <Table size="small">
                <TableBody>
                    <TableRow>
                        <TableCell align="left"><h1>{template.name}</h1></TableCell>
                        <TableCell align="right"><Button variant="contained" color="primary" >Apply</Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
                
            
            <Table size="small">
                <TableBody>
                    {template.allocations.map(elem=>(
                        <TableRow key={elem.description}>
                            <TableCell align="left">{elem.description}</TableCell>
                            <TableCell align="right">{elem.percentage}%</TableCell>
                        </TableRow>
                    ))}        
                </TableBody>
            </Table>
        </Container>)
    
        return comp;
    }
    

    const page = 
    (<Container component="main" maxWidth="md">
        {props.wallet_template.map(elem=>(
            <div key={elem.name}>
                {getTemplateComponent(elem)}
            </div>
        ))}
        
    </Container>)

    return page;
    
}

function mapStateToProps(state){
    return state
}
  
function mapDispatchToProps(dispatch){

}

export default connect(mapStateToProps)(Setting)
// export default connect(mapStateToProps, mapDispatchToProps)(Setting)
  