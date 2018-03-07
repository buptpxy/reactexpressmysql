import React, {Component} from 'react';
import Modal from 'react-modal/lib/components/Modal.js';
import {withRouter} from "react-router-dom";
class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            modalIsOpen: false,
            modal1IsOpen: false,
            name: '',
            age: '',
            msg: '',
            id: 0
        }
        this.openModal = this.openModal.bind(this);
        this.openModal1 = this.openModal1.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModal1 = this.closeModal1.bind(this);
        this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this); // Function where we submit data
        //this.handleRouterPush = this.handleRouterPush.bind(this); 

    }

    openModal(member) {
        this.setState({
            modalIsOpen: true,
            name: member.name,
            age: member.age,
            id: member.id
        });
    }
    openModal1() {
        this.setState({
            modal1IsOpen: true,
        });
    }
    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }
    closeModal1() {
        this.setState({
            modal1IsOpen: false
        });
    }
    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }
    // handleRouterPush(path) {
    //     this.props.history.push(path);
    // }

    handleAdd(event) {
        event.preventDefault()
        var self = this;
        var data = {
            name: self.state.name,
            age: self.state.age
        }
        console.log(data)
        fetch("http://localhost:4000/users/addUser?name="+data.name+"&age="+data.age, {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)    
            if(data.code === 200){
                console.log("Thanks for registering");
                self.setState({
                    msg: "Thanks for registering",
                    modal1IsOpen: false
                });
                //self.handleRouterPush('/Admin');  
            }
        }).catch(function(err) {
            console.log(err)
        });
        self.queryMember();
    }
    handleEdit(event) {
        //Edit functionality
        let self = this;
        event.preventDefault()
        var data = {
            name: self.state.name,
            age: self.state.age,
            id: self.state.id
        }
        fetch("http://localhost:4000/users/updateUser?name="+data.name+"&age="+data.age+"&id="+data.id, {
            method: 'POST',
            mode: "cors",
           
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data);
            if (data.code === 200) {
                console.log("User has been updated.");
                self.setState({
                    msg: "User has been updated.",
                    modalIsOpen: false
                });

            }
        }).catch(function(err) {
            console.log(err)
        });
        self.queryMember();
    }
    deleteMember(member){
        let self = this;
        var data = {
            id: member.id
        }
        fetch("http://localhost:4000/users/deleteUser?id="+data.id, {
            method: 'POST',
            mode: "cors",
           
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if(data.code === 200){
                console.log(data);
                console.log("User has been deleted.");
                self.setState({msg: "User has been deleted."}); 
                //self.handleRouterPush('/Admin');
            }
        }).catch(function(err) {
            console.log(err)
        });
        self.queryMember();
    }
    queryMember(){
         let self = this;
        fetch('http://localhost:4000/users/queryAll', {
            method: 'GET',
            mode: "cors"
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data);
            self.setState({
                users: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }
    componentDidMount() {
       this.queryMember();
    }
    componentWillMount() {
        Modal.setAppElement('#root');
    }
   
    render() {
        return ( 
        <div className="container"> 
            <div className="panel panel-default p50 uth-panel">
            <button onClick={() => this.openModal1()}>新增</button>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Member name</th>
                            <th>Member age</th>
                            
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(member =>
                            <tr key={member.id}>
                                <td>{member.name} </td>
                                <td>{member.age}</td>
                                
                                <td><a onClick={() => this.openModal(member)}>Edit</a>|<a onClick={() => this.deleteMember(member)}>Delete</a></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal" >
                <form onSubmit={this.handleEdit} method="POST">
                    <label>Name</label>
                    <input onChange={this.logChange} className="form-control" value={this.state.name}  name='name' />
                    <label>Age</label>
                    <input onChange={this.logChange} className="form-control" value={this.state.age}  name='age' />
                    <div className="submit-section">
                    <button className="btn btn-uth-submit">Submit</button>
                    </div>
                </form>
            </Modal>
            <Modal
                isOpen={this.state.modal1IsOpen}
                onRequestClose={this.closeModal1}
                contentLabel="Example Modal" >
                <form onSubmit={this.handleAdd} method="POST">
                    <label>Name</label>
                    <input onChange={this.logChange} className="form-control"  name='name' />
                    <label>Age</label>
                    <input onChange={this.logChange} className="form-control"  name='age' />
                    <div className="submit-section">
                    <button className="btn btn-uth-submit">Submit</button>
                    </div>
                </form>
            </Modal>
        </div>
        );
    }
}
export default withRouter(Admin);