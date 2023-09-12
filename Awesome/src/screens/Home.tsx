import {
  Text, View, StyleSheet, TextInput, FlatList,
  Alert, ActivityIndicator, Modal, TouchableOpacity,
  Dimensions, Pressable
} from "react-native";
import TextCom from "../compoenent/TextCom";
import ListCom from "../compoenent/ListCom";
import { Fragment, useEffect, useState } from "react";
import { useAddNewPostMutation, useLazyGetdataQuery } from "../service/detapidata";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { validation } from "../utility/validation";
const Home = () => {
  const [filtereddata, setFilterdata] = useState([]);
  const [orignaldata, setOrignaldata] = useState([]);
  const [workingtitle, setWorkingtitle] = useState(false);
  const [workingbody, setWorkingBody] = useState(false)
  const [texttitle, setTitle] = useState("");
  const [textbody, setTextbody] = useState("");
  const [workingupdatetitle, setWorkingupdatetitle] = useState(false);
  const [workingupdatebody, setWorkingupdatebody] = useState(false);
  const [popup, setPopup] = useState(true);
  const route = useRoute();
  const { updatetitle, updatebody } = route.params ? route.params : "";
  const [getdatas, { isSuccess, isError, isLoading, isFetching }] = useLazyGetdataQuery()
  const [addPost, { postsuccess = isSuccess, postError = isError, postloading = isLoading }] = useAddNewPostMutation();
  console.log("...............PostRequesr.......................");
  console.log("postsucce is ===========" + postsuccess);
  console.log("PostError is ===========" + postError);
  const msg = "Title should not be empty";
  const msg1 = "Title Should be greterthen 3 character";
  const updatefun = async () => {
    if (updatetitle && updatebody) {
      const title = updatetitle;
      const body = updatebody;
      setFilterdata((prev) => {
        return [...prev, { title, body }];
      })
    } else {
      console.log("Title And Body Not EMpty");

    }
  }
  const fetchingdata = async () => {
    const { data } = await getdatas();
    setOrignaldata(data);
    setFilterdata(data)
  }
  const addhandler = async () => {
    const { error, message } = await validation({ texttitle, textbody });
    if (error) {
      if (message === msg || message === msg1) {
        setWorkingtitle(true);
      } else {
        setWorkingBody(true);
      }
    } else {
      await addPost({ texttitle, textbody }).then((res) => {
        if (res) {
          console.log("Response is =====================" + res);
          const userid = Math.random().toFixed(2) * 100;
          let ids = 101;
          setFilterdata((prev) => {
            const title = texttitle;
            const body = textbody;
            return [...prev, { userId: userid, id: ids, title, body }]
          })
          ids++;
          setPopup(false)
        }
        console.log("Our New Data is =======" + JSON.stringify(filtereddata));
      }).catch((error) => {
        console.log("errrrrrrrrrrrrrrrrrrrorrrrrrrrrrrr is = " + error);
        Alert.alert(error)

      })
    }
  }
  useEffect(() => {
    updatefun();
    fetchingdata();
    if (isError) {
      Alert.alert("Something will wrong please restart the app")
    }
    if (postError) {
      Alert.alert("Something get wrong please add again");
    }
  }, [isError, texttitle, textbody])
  const searchfun = (val: any) => {
    if (isSuccess) {
      if (val && val !== undefined) {
        const newData = orignaldata.filter(
          function (item: any) {
            const itemData = item.title
              ? item.title.toLowerCase()
              : ''.toLowerCase();
            const textData = val.toLowerCase();
            return itemData.includes(textData);
          });
        setFilterdata(newData)
      } else {
        setFilterdata(orignaldata);
      }
    }
  }
  const funcD = (value: string) => {
    setFilterdata(() => {
      return filtereddata.filter((item: any) => item.id !== value)
    })
  }
  return (
    <Fragment>
      {
        isLoading ? (
          <View style={[styles.loadingpage]}>
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <Fragment>
            <View style={[styles.Homepagecontainer]}>
              {/* .........textinputandaddiconcomponent........... */}
              <TextCom
                currData={(val: string) => searchfun(val)}
                openCreateModal={(popup: any) => setPopup(popup)} />
              {/* ...End........ */}
              {/* .........ListComponents......... */}
              <FlatList
                scrollEnabled={true}
                data={filtereddata}
                renderItem={({ item }) => <ListCom curdata={(val: string) => funcD(val)} title={item.title} id={item.id} />}
              />
              {/* ...........ENd........... */}
            </View>
            {/* .............popups-Model............ */}
            <Modal style={[styles.popupsdesign]} transparent={true} visible={popup}>
              <View style={[styles.popupscontainer]}>
                <Pressable style={[styles.closeiconcontainer]} onPress={() => setPopup(false)}>
                  <Icon name="close" size={30} />
                </Pressable>
                <View style={[styles.inputcontainerandbtn]}>
                  <View style={[styles.inputcontainer]}>
                    <TextInput onChangeText={(value) => setTitle(value)}
                      multiline placeholder="Enter Your Tile" style={[styles.inputstyle1, { borderColor: workingtitle ? "red" : "black" }]} />
                    <TextInput onChangeText={(value) => setTextbody(value)}
                      multiline placeholder="Enter Your Body" style={[styles.inputstyle2, { borderColor: workingbody ? "red" : "black" }]} />
                  </View>
                  <TouchableOpacity style={[styles.touchablebtn]} onPress={() => addhandler()}>
                    <Text style={[styles.touchablebtntext]}>Create New</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </Fragment>
        )
      }
    </Fragment>
  );
}
export default Home;
const styles = StyleSheet.create({
  loadingpage: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Homepagecontainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  popupsdesign: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  popupscontainer: {
    alignItems: 'center',
    elevation: 50,
    justifyContent: 'space-evenly',
    shadowColor: '#52006A',
    borderRadius: 20,
    height: 450,
    width: 350,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 150
  },
  closeiconcontainer: {
    marginBottom: '30%',
    marginRight: 10,
    alignSelf: 'flex-end'
  },
  inputcontainerandbtn: {
    marginBottom: '30%',
    justifyContent: 'center',
    width: 350,
    alignItems: 'center'
  },
  inputcontainer: {
    gap: 10,
    justifyContent: 'center',
    width: '90%'
  },
  inputstyle1: {

    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10
  },
  inputstyle2: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10
  },
  touchablebtn: {
    marginVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    width: '70%',
    backgroundColor: 'black'
  },
  touchablebtntext: {
    color: 'white',
    fontSize: 18,
    padding: 10
  }
})