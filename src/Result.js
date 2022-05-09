import './App.css'
import 'react-simple-keyboard/build/css/index.css';
import { DialogProvider, useDialog } from "react-bootstrap-easy-dialog";


export default function Page(props) {
    const dialog = useDialog();

    if (props.isGameOver) {
        dialog.alert(
            <div>
                <div>
                    <h4> Game over </h4>
                </div>
                <div>
                    <h6>Results</h6>
                    <button onClick={() => dialog.hide()}>Play again</button>
                </div>
            </div>
        )
        
       
    }
      
  }