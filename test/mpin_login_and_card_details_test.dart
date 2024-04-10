// import 'package:flutter/material.dart';
// import 'package:flutter_cms_sdk/src/services/api_service.dart';
// import 'package:flutter_test/flutter_test.dart';
// import 'package:mockito/mockito.dart';
// import '../lib/src/screens/mpin_login_page.dart';
//
// class MockApiService extends Mock implements ApiService{}
//
// void main() {
//   // test('adds one to input values', () {
//   //   final calculator = Calculator();
//   //   expect(calculator.addOne(2), 3);
//   //   expect(calculator.addOne(-7), -6);
//   //   expect(calculator.addOne(0), 1);
//   //   const MPinLoginPage();
//   late MPinLoginPage mPinLoginPage;
//   late MockApiService mockApiService;
//
//   setUp(() {
//     mockApiService = MockApiService();
//     mPinLoginPage = MPinLoginPage();
//   });
//
//   testWidgets('MPinLoginPage UI test', (WidgetTester tester) async {
//     await tester.pumpWidget(MaterialApp(home: MPinLoginPage));
//
//     // Verify initial UI elements
//     expect(find.text('Enter M-PIN'), findsOneWidget);
//     expect(find.text('Enter your M-PIN for a secure entry to your card'), findsOneWidget);
//     expect(find.text('Login'), findsOneWidget);
//     expect(find.text('Reset MPin'), findsOneWidget);
//   });
//   // });
//
//
// }
