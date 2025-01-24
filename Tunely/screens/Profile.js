import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../styles';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={portfolioStyles.header}>My Profile</Text>
        

        <View style={portfolioStyles.profileSection}>
          <Image
            source={ require('../assets/profile.png')} 
            style={portfolioStyles.profileImage}
          />
          <Text style={portfolioStyles.name}>Bill Murray</Text>
          <Text style={portfolioStyles.username}>@BilM</Text>
          <TouchableOpacity style={portfolioStyles.editButton}>
            <Text style={portfolioStyles.editText}>Edit</Text>
          </TouchableOpacity>

          <View style={portfolioStyles.statsContainer}>
            <View style={portfolioStyles.stat}>
              <Text style={portfolioStyles.statNumber}>63</Text>
              <Text style={portfolioStyles.statLabel}>Collec</Text>
            </View>
            <View style={portfolioStyles.stat}>
              <Text style={portfolioStyles.statNumber}>37</Text>
              <Text style={portfolioStyles.statLabel}>Saves</Text>
            </View>
            <View style={portfolioStyles.stat}>
              <Text style={portfolioStyles.statNumber}>21</Text>
              <Text style={portfolioStyles.statLabel}>Followers</Text>
            </View>
            <View style={portfolioStyles.stat}>
              <Text style={portfolioStyles.statNumber}>12</Text>
              <Text style={portfolioStyles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        <View style={portfolioStyles.menu}>
          <TouchableOpacity style={portfolioStyles.menuItem}>
            <Text style={portfolioStyles.menuText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={portfolioStyles.menuItem}>
            <Text style={portfolioStyles.menuText}>Connected services</Text>
          </TouchableOpacity>
          <TouchableOpacity style={portfolioStyles.menuItem}>
            <Text style={portfolioStyles.menuText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={portfolioStyles.menuItem}>
            <Text style={portfolioStyles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const portfolioStyles = StyleSheet.create({

  header: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 100,
    color: '#FFFFFF',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FFFFFF',
  },
  username: {
    fontSize: 16,
    color: 'gray',
  },
  editButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  editText: {
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  stat: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    color: 'gray',
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
