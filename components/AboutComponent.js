import React, {Component} from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card} from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }
function History(){
    return(
        <Card title="Our Hitory">
        <Text>
           Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
        </Text>
        <Text>
           Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
        </Text>
      </Card>
    )
} 
class About extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         leaders:LEADERS
    //     }
    // }
    static navigationOptions = {
        title: 'About Us',
    };
    render() {

        if (this.props.leaders.isLoading) {
            return(
                <ScrollView>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if (this.props.leaders.errMess) {
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        else {
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History />
                    <Card
                    title='Corporate Leadership'>
                    {
                        this.props.leaders.leaders.map((item, index)=>{
                            return(
                            <ListItem
                                key={index}
                                title={item.name}
                                subtitle={item.description}
                                leftAvatar={{source: {uri: baseUrl + item.image}}}
                              />
                            )
                        })
                    }
                </Card>
                    </Animatable.View>
            </ScrollView>
            );
        }
    }
}

export default connect(mapStateToProps)(About);