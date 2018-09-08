import React, {Component} from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card} from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
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
        
        return(
            <ScrollView>
                      <Card title="Our Hitory">
                        <Text>
                        Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                        </Text>
                        <Text>
                        Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                        </Text>
                      </Card>
                      <Card title="Corporate Leadership">
                        {
                            this.props.leaders.leaders.map((item, index)=>{
                                return(
                                <ListItem
                                    key={index}
                                    title={item.name}
                                    subtitle={item.description}
                                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                                    // leftAvatar={{ source: require('./images/alberto.png')}}
                                  />
                                )
                            })
                        }
                      </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(About);