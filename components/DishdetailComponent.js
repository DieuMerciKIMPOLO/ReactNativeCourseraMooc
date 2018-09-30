import React, {Component} from 'react';
import { Text, View, ScrollView, FlatList,StyleSheet, Button,Modal, Alert,PanResponder,Share } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite,postComment } from '../redux/ActionCreators';
import { Rating } from 'react-native-elements';
import { Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment:(dishId, rating, author,comment, commentId)=>dispatch(postComment(dishId, rating, author,comment,commentId))
})
function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating}Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>        
        <Card title='Comments' >
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
        </Card>
        </Animatable.View>
        
    );
}
handleViewRef = ref => this.view = ref;
// onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},
function RenderDish(props) {

    const dish = props.dish;
    
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }
    const recognizeDrag2 =({moveX, moveY, dx,dy})=>{
        if(dx > 200)
          return true;
        else
         return false;
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
            if(recognizeDrag2(gestureState))
                props.toggleModal();
            return true;
        }
    })
    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }
    if (dish != null) {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}>
            <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
    
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                    <Icon
                        raised
                        reverse
                        name='share'
                        type='font-awesome'
                        color='#51D2A8'
                        // style={styles.cardItem}
                        onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} />
                        <Icon
                        raised
                        reverse
                        name='create'
                        color='#512DA8'
                        onPress={() => props.toggleModal()} //The function that allows us to open the modal
                        />
                </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

class Dishdetail extends Component  {
    constructor(props){
        super(props);
        this.state = {
            favorites: [],
            comment:null,
            author:null,
            showModal:false,
            rating_value:3
        };
    }
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    /*This function allow me to handle the form  submission*/
    handleCommentSubmit(dishId){
        console.log('Your dish', dishId)
        this.setState({isSubmit:true})
        const commentId=this.props.comments.comments.length + 1;
        this.props.postComment(dishId, this.state.rating_value, this.state.author,this.state.comment, commentId)
    }
    static navigationOptions ={
        title: 'Dish Details'
    }
    
    /* This function allow me to set in my state the current value of the rating field*/
    getCurrentRate(rating) {
        console.log("Rating is: " + rating)
        this.setState({rating_value: rating});
      }
    render(){
        
        const dishId= this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
            <RenderDish 
                dish={this.props.dishes.dishes[+dishId]}
                favorite={this.props.favorites.some(el => el === dishId)}
                onPress={() => this.markFavorite(dishId)}
                toggleModal={()=>this.toggleModal()} //Here I'm passing the function that allow me to open the modal 
                />
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
        
    {/* Form modal*/}
      <Modal animationType = {"slide"} transparent = {false}
            visible = {this.state.showModal}
            onDismiss = {() => this.toggleModal() }
            onRequestClose = {() => this.toggleModal() }>
            <View>
            {/* Ratinng Field*/}
                <Rating
                    showRating
                    onFinishRating={(rating)=>this.getCurrentRate(rating)}
                    style={{ paddingVertical: 10 }}

                    />
            </View>
            <View>
            {/* Author Input Field*/}
            <Input
            style={{ paddingVertical: 10 }}
            placeholder='Author'
            onChangeText={(value) => this.setState({author:value})}
            leftIcon={
              <Icon
                type='font-awesome'
                name='user-o'
                size={24}
                color='black'
              />
            }
          />
            </View>
           <View>
            {/* Comment Input Field*/}
           <Input
           style={{ paddingVertical: 10 }}
           placeholder='Comment'
           onChangeText={(value) => this.setState({comment:value})}
           leftIcon={
             <Icon
               name='comment'
               size={24}
               color='black'
               type='font-awesome'
             />
           }
         />
           </View>
            <View>
              {/* Submit Button*/}
              <Button 
                style={{ paddingVertical: 10 }}
                onPress = {() =>{this.handleCommentSubmit(dishId)}}
                color="#512DA8"
                title="Submit" 
                />
                <Text>
                  {this.state.isSubmit?this.state.author:null}
                </Text>
           </View>
            <View>
                {/* Close Modal Button*/}
                <Button 
                    style={{ paddingVertical: 10 }}
                    onPress = {() =>{this.toggleModal()}}
                    color="black"
                    title="Close" 
                    />
            </View>
        </Modal>
        </ScrollView>
        );
    }
    
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

