import React from 'react';
import {
  Body,
  Card,
  CardItem,
  Icon,
  Left,
  Right,
  Text,
  Thumbnail,
} from 'native-base';
import {View} from 'react-native';
import * as PropTypes from 'prop-types';
import {FEMALE_GENDER} from '../../Utils/Constants';
import {getFullName} from '../../Utils/Functions';
import {
  getUserAssociationRoleId,
  isAdmin,
  isAuthorized,
  isSuperAdmin,
} from '../../Utils/Account';

const UserCard = (props) => {
  let logo = require('../../../assets/images/male_unselected.png');
  if (props.data.gender === FEMALE_GENDER) {
    logo = require('../../../assets/images/female_unselected.png');
  }
  const roleAssociationId = getUserAssociationRoleId(props.data);
  return (
    <Card transparent>
      <CardItem>
        <Left>
          <Thumbnail source={logo} />
          <Body>
            <Text style={{fontSize: 13}}>{getFullName(props.data)}</Text>
            <Text style={{fontSize: 11}}>{props.data.phoneNumber}</Text>
          </Body>
        </Left>
        <Right style={{height: 58}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row'}}>
              {isAuthorized(props.data) && (
                <Text style={{marginTop: 20, marginRight: 30}}>
                  <Icon
                    type="AntDesign"
                    name="checkcircleo"
                    style={{fontSize: 17, color: '#49bd78'}}
                  />
                </Text>
              )}
              {isSuperAdmin(props.data) ||
                (isAdmin(props.data) && (
                  <Text style={{marginTop: 20, marginRight: 30}}>
                    <Icon
                      type="FontAwesome5"
                      name="user-cog"
                      style={{fontSize: 17, color: '#000'}}
                    />
                  </Text>
                ))}
              {roleAssociationId?.name && (
                <Text style={{marginTop: 20, marginRight: 30}}>
                  {roleAssociationId?.name}
                </Text>
              )}
            </View>
            <Text
              onPress={() => props.showUser(props.data, props.currentUserIndex)}
              style={{fontSize: 17}}>
              ...
            </Text>
          </View>
        </Right>
      </CardItem>
    </Card>
  );
};

UserCard.propTypes = {
  data: PropTypes.object,
  showUser: PropTypes.func,
  currentUserIndex: PropTypes.number,
};

export default UserCard;
