import Wrapper from 'containers/wrapper';

import { FORM_STEPS } from '../constants';
import Form from '../form';
import FormWrapper from '../form/wrapper';
import MyProjectsSidebar from '../sidebar';

import NewProjectHeader from './header';

export default function NewProject() {
  return (
    <Wrapper className="w-full">
      <FormWrapper
        onSubmit={async (data) => console.log('form wrapper', data)}
        render={({ handleSubmit }) => {
          return (
            <div className="flex flex-col gap-14">
              <NewProjectHeader />
              <div className="grid grid-cols-12 gap-16">
                <div className="col-span-3">
                  <MyProjectsSidebar sections={FORM_STEPS} />
                </div>
                <div className="col-span-9">
                  <Form handleSubmit={handleSubmit} />
                </div>
              </div>
            </div>
          );
        }}
      />
    </Wrapper>
  );
}
