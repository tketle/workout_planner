insert into muscle_region (id, name, muscle_group, muscles) values
('a27eb84b-cc11-418d-8f67-7e36cca172a1', 'Chest', 'Push', 'chest muscle 1,chest muscle 2'),
('e8ac01c2-4cd7-42af-b610-e5c7164c36af', 'Shoulders', 'Push', 'shoulder muscle 1,shoulder muscle 2'),
('5a1c6a44-81e1-4666-b51e-c9a9ae1891ac', 'Triceps', 'Push', 'triceps'),
('b7cf8e13-da20-4bbd-b6f2-ff0aaee57695', 'Back', 'Pull', 'back muscle 1,back muscle 2'),
('febc1aa9-571a-4232-b63e-65eeb6b6c06d', 'Biceps', 'Pull', 'biceps'),
('7af80881-7a47-4364-b8a6-7f5aeef3e961', 'Upper Abs', 'Core', 'upper abs'),
('f9d1c2b5-710c-4829-a210-f3b1791c0e25', 'Mid Abs/Obliques', 'Core', 'mid abs,obliques'),
('729b19d9-c4b2-455b-9615-451d887b1657', 'Lower Abs', 'Core', 'lower abs'),
('7a0a7cd2-73d7-4cfd-8133-a20e5e2b2433', 'Upper Legs', 'Legs', 'upper legs muscle 1,upper legs muscle 2'),
('075aaf23-8a8a-4efe-bc93-8222cc960f6f', 'Lower Legs', 'Legs', 'lower legs muscle 1,lower legs muscle 2');

insert into anaerobic_exercise (id, name, muscle_region, targeted_muscles, equipment, version, active) values
('43abb6bc-3d12-46a0-b198-61645866b852', 'Chest placeholder 1', 'a27eb84b-cc11-418d-8f67-7e36cca172a1', 'chest muscle 1,chest muscle 2', 'placeholder', 1, 1),
('2352ad1a-3f1c-45ff-974f-fc32759c83ff', 'Chest placeholder 2', 'a27eb84b-cc11-418d-8f67-7e36cca172a1', 'chest muscle 1,biceps', 'placeholder', 1, 1),
('8491332f-370a-4f6d-83ec-80779ab149b1', 'Chest placeholder 3', 'a27eb84b-cc11-418d-8f67-7e36cca172a1', 'chest muscle 1', 'placeholder', 1, 0),
('6905d1bb-3d4c-490c-a717-659864c09262', 'Shoulders placeholder 1', 'e8ac01c2-4cd7-42af-b610-e5c7164c36af', 'shoulder muscle 1', 'placeholder', 1, 1),
('58ae742f-f0e5-4f76-9020-baa018704936', 'Triceps placeholder 1', '5a1c6a44-81e1-4666-b51e-c9a9ae1891ac', 'triceps', 'placeholder', 1, 1),
('2886b17c-19d8-42fb-a183-4ca4b6124785', 'Back placeholder 1', 'b7cf8e13-da20-4bbd-b6f2-ff0aaee57695', 'back muscle 1', 'placeholder', 1, 1),
('9e98ed0a-4075-4dea-aa08-468d208583d0', 'Biceps placeholder 1', 'febc1aa9-571a-4232-b63e-65eeb6b6c06d', 'biceps', 'placeholder', 1, 1),
('1c6d7112-e1f1-47c0-b762-f26e37328276', 'Upper Abs placeholder 1', '7af80881-7a47-4364-b8a6-7f5aeef3e961', 'upper abs', 'placeholder', 1, 1),
('563e5372-8563-4fa6-a8a6-91589c2c6725', 'Mid Abs/Obliques placeholder 1', 'f9d1c2b5-710c-4829-a210-f3b1791c0e25', 'mid abs,obliques', 'placeholder', 1, 1),
('fb0a3ef3-ca97-4649-b9b8-7968c8a03b2f', 'Lower Abs placeholder 1', '729b19d9-c4b2-455b-9615-451d887b1657', 'lower abs', 'placeholder', 1, 1),
('b34180a9-26cb-47ff-960d-ae0582fd90d4', 'Upper Legs placeholder 1', '7a0a7cd2-73d7-4cfd-8133-a20e5e2b2433', 'upper legs muscle 1', 'placeholder', 1, 1),
('a01e84b3-947a-4315-9440-740a323e5315', 'Lower Legs placeholder 1', '075aaf23-8a8a-4efe-bc93-8222cc960f6f', 'lower legs muscle 1', 'placeholder', 1, 1);

insert into aerobic_exercise (id, name, equipment, version, active) values
('e76207be-6a3c-42bf-92b8-4484ca58dbc6', 'Test exercise 1', 'placeholder', 1, 1),
('b17c1e14-a69d-44dd-9282-79864f291f7d', 'Test exercise 2', 'placeholder', 1, 0),
('fe8637f9-8485-491d-b9b4-f147b9006ffb', 'Test exercise 2', 'placeholder', 2, 1),
('ca440168-859a-4dac-b727-277a6dd92223', 'Test exercise 3', 'placeholder', 1, 0);

insert into workout (id, date, aerobic_exercise, anaerobic_exercise, duration, weight, repetitions, sets) values
('991cb73e-e905-4b05-83ca-fc9ffcd6fdf1', '2022-02-20', 'e76207be-6a3c-42bf-92b8-4484ca58dbc6', NULL, 30, NULL, NULL, NULL),
('d8e5971d-71a0-4640-9998-b16a6cf4fda7', '2022-02-20', NULL, '43abb6bc-3d12-46a0-b198-61645866b852', NULL, 10, 3, 8),
('6ef93c5e-102d-46b0-a90b-0cf163abf63c', '2022-02-20', NULL, '6905d1bb-3d4c-490c-a717-659864c09262', NULL, 10, 3, 8),
('8ea977da-dc9a-485c-9be4-b1c1ee6a37de', '2022-02-20', NULL, '58ae742f-f0e5-4f76-9020-baa018704936', NULL, 10, 3, 8),
('92b77b14-c369-4314-9b23-faca986dbce5', '2022-02-20', NULL, '1c6d7112-e1f1-47c0-b762-f26e37328276', NULL, 10, 2, 8),
('7ffba6d9-7f87-4cb5-97af-e3f88d51ad4f', '2022-02-20', NULL, '563e5372-8563-4fa6-a8a6-91589c2c6725', NULL, 10, 2, 8),
('eacd4cbe-7ccb-48f0-b12c-c237d76bfc06', '2022-02-20', NULL, 'fb0a3ef3-ca97-4649-b9b8-7968c8a03b2f', NULL, 10, 2, 8),
('72e215f8-adcf-42cf-a859-7b6dc76667a9', '2022-02-22', NULL, '2886b17c-19d8-42fb-a183-4ca4b6124785', NULL, 10, 2, 8),
('7297e9e4-aee1-44bf-a8d9-7d6432dfe032', '2022-02-22', NULL, '9e98ed0a-4075-4dea-aa08-468d208583d0', NULL, 10, 2, 8),
('03a7c31c-f0f8-499a-97a4-3f906532911c', '2022-02-24', 'b17c1e14-a69d-44dd-9282-79864f291f7d', NULL, 1200, NULL, NULL, NULL),
('033ad14d-8e57-4131-bed8-0e62af27c95c', '2022-02-24', NULL, 'b34180a9-26cb-47ff-960d-ae0582fd90d4', NULL, 10, 2, 8),
('39d7068c-b7d4-4cb4-8adb-f18a51386273', '2022-02-24', NULL, 'b17c1e14-a69d-44dd-9282-79864f291f7d', NULL, 10, 2, 8);