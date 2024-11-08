import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
  
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);

        this.state = {
        	isModalOpen: false,
        };
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    
    handleComment(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }


    render() {

        return(
        	<div>
        		<Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment </Button>
        		<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleComment(values)}>
                        <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="yourname">Your Name</Label>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required...',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="message">Comment</Label>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:12}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
        	</div>


        );

        
    }    	

}
    
    function RenderDish({dish}) {
        if (dish != null)
            return(
            	<div className="col-12 col-md-5 m-1">
	                <Card>
	                    <CardImg width="100%" top src={dish.image} alt={dish.name} />
	                    <CardBody>
	                      <CardTitle>{dish.name}</CardTitle>
	                      <CardText>{dish.description}</CardText>
	                    </CardBody>
	                </Card>
	            </div>
        	);
	    else
            return(
                <div></div>
	    	);
    }

    function RenderComments({comments, addComment, dishId}) {
    	var dishComment = null;
    	if (comments!=null)
				return(
					<div className="col-12 col-md-5 m-1">
							
							<h4>Comments</h4>
		                	{comments.map((comment) => {
		                		return(
		                			<ul className="list-unstyled">
			                			<li>{comment.comment}</li>
					                    <li>--{comment.author}, 
					                    {new Intl.DateTimeFormat('en-US', 
					                    { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
				                    </ul>
		                		);
		                	})}

		                	<CommentForm dishId={dishId} addComment={addComment} />
		            </div>
	            );
    							    				
    	else
    		return(
    			<div></div>
    		);		
    }

    const  DishDetail = (props) => {
    	if(props.dish != null)
    		return (
                <div className="container">
	                <div className="row">
	                    <Breadcrumb>
	                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
	                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
	                    </Breadcrumb>
	                    <div className="col-12">
	                        <h3>{props.dish.name}</h3>
	                        <hr />
	                    </div>                
	                </div>

	                <div className="row">
	                        <RenderDish dish={props.dish} />
	                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                            />
	                </div>    
                </div>
            );
    	else
    		return(
    			<div></div>
    		);
    }


export default DishDetail;