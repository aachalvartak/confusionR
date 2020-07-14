import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component{

	constructor(props) {
        super(props);    
    }
    
    renderDish(dish) {
        if (dish != null)
            return(
                <Card>
                    <CardImg width="100%" top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
        	);
	    else
            return(
                <div></div>
	    	);
    }

    renderComments(dishComment) {
    	if (dishComment!=null)
    		return(
    			<div>
    				<h4>Comments</h4>
    				{dishComment}
    			</div>
    		);
    	else
    		return(
    			<div></div>
    		);		
    }

	render() {

		const selectedDish = this.props.dish;
		var dishComment = null;
		if(selectedDish) {
			dishComment = selectedDish.comments.map((comment) => {
	            return (
	                <ul key={comment.id} className="list-unstyled">
	                	<li>{comment.comment}</li>
	                    <li>--{comment.author}, 
	                    {new Intl.DateTimeFormat('en-US', 
	                    { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
	                </ul>
	            );
	        });
		}

	    return (
	    	<div className="container">
				<div className="row">

					<div className="col-12 col-md-5 m-1">
				        {this.renderDish(this.props.dish)}
				    </div>

				    <div className="col-12 col-md-5 m-1">
				    	{this.renderComments(dishComment)}
				    </div>

				</div>
			</div>
        );  

	}

}

export default DishDetail;